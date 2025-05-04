import React, { useEffect, useState } from 'react';
import { db } from '../Config.ts';
import { collection, getDocs } from 'firebase/firestore';
import { FaBoxOpen, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';

interface Query {
    email: string;
    question: string;
    typeOfQuery: string;
    date: string;
}

const typeGroups = {
    order: ['orderDetails', 'orderCreate'],
    account: ['accountDetails', 'accountUpdate'],
    general: ['general'],
};

const Analytics = () => {
    const [queries, setQueries] = useState<Query[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [frequentQuery, setFrequentQuery] = useState<string | null>(null);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'query'));
                const data: Query[] = snapshot.docs.map(doc => doc.data() as Query);
                setQueries(data);
            } catch (err) {
                console.error("Error fetching queries:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchQueries();
    }, []);

    const countByCategory = (category: string) =>
        queries.filter(q => typeGroups[category].includes(q.typeOfQuery)).length;

    const getPercentage = (count: number) =>
        queries.length ? ((count / queries.length) * 100).toFixed(1) : '0.0';

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        const filtered = queries.filter(q => typeGroups[category].includes(q.typeOfQuery));
        const freqMap: Record<string, number> = {};
        filtered.forEach(q => {
            const question = q.question.trim();
            freqMap[question] = (freqMap[question] || 0) + 1;
        });
        const mostFrequent = Object.entries(freqMap).sort((a, b) => b[1] - a[1])[0];
        setFrequentQuery(mostFrequent ? mostFrequent[0] : 'No frequent query');
    };

    const icons = {
        order: <FaBoxOpen className="text-3xl text-blue-500" />,
        account: <FaUserCircle className="text-3xl text-green-500" />,
        general: <FaQuestionCircle className="text-3xl text-purple-500" />
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">📊 Analytics Dashboard</h1>

            {loading ? (
                <p className="text-center text-gray-600">Loading data...</p>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-10">
                        {['order', 'account', 'general'].map((category) => (
                            <div
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className="cursor-pointer bg-white rounded-xl p-6 shadow hover:shadow-lg transition border border-gray-200 hover:border-blue-400"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-lg font-semibold capitalize text-gray-700">
                                        {category} Queries
                                    </h2>
                                    {icons[category as keyof typeof icons]}
                                </div>
                                <p className="text-3xl font-bold text-blue-600">
                                    {getPercentage(countByCategory(category))}%
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Frequent Query Section */}
                    {selectedCategory && (
                        <div className="bg-blue-50 border border-blue-300 rounded-lg p-5 mb-8 shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                Most Frequent "{selectedCategory}" Query
                            </h3>
                            <p className="text-gray-800 text-lg">{frequentQuery}</p>
                        </div>
                    )}

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow overflow-x-auto border border-gray-200">
                        <table className="min-w-full table-auto text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Question</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {queries.map((q, idx) => (
                                <tr key={idx} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{q.email}</td>
                                    <td className="px-4 py-2">{q.question}</td>
                                    <td className="px-4 py-2 capitalize">{q.typeOfQuery}</td>
                                    <td className="px-4 py-2">{new Date(q.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Analytics;
