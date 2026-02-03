import { ChartLine } from 'lucide-react'
import { DashboardCard } from './DashboardCard'
import { CardHeader } from './CardHeader'
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from 'convex/_generated/api';
import { usePersona } from "@/contexts/persona-context";
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from "@convex-dev/react-query";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { formatProfit } from '@/lib/utils';

const getToggleButtonClass = (isActive: boolean) => {
    const base = 'px-4 py-1.5 rounded-lg text-sm font-medium transition-all';
    const active = 'bg-emerald-500 text-white';
    const inactive = 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600';
    return `${base} ${isActive ? active : inactive}`;
};


export function ChartCard({ className }: { className?: string }) {
    const { selectedPersonaId: personaId } = usePersona();
    const [viewMode, setViewMode] = useLocalStorage<string>('viewMode', 'daily');
    const [metricType, setMetricType] = useLocalStorage<string>('metricType', 'profit');


    const { data } = useQuery({
        ...convexQuery(api.trades.showProfitChart, personaId ? { personaId } : "skip"),
        placeholderData: previousData => previousData,
    });

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <DashboardCard className={className}>
                <div className="relative z-10">
                    <CardHeader icon={ChartLine} title="Profit & Sales Chart" />
                </div>
            </DashboardCard>
        )
    }

    const profitDataKey = viewMode === 'daily' ? 'profitInDay' : 'profitInTotal';
    const salesDataKey = viewMode === 'daily' ? 'sellCountInDay' : 'sellCountInTotal';
    const currentDataKey = metricType === 'profit' ? profitDataKey : salesDataKey;

    return (
        <DashboardCard className={className}>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <CardHeader
                        icon={ChartLine}
                        title={metricType === 'profit' ? 'Profit Chart' : 'Sales Chart'}
                    />
                    <div className="flex gap-2">

                        <button
                            onClick={() => setMetricType('profit')}
                            className={getToggleButtonClass(metricType === 'profit')}
                        >
                            Profit
                        </button>
                        <button
                            onClick={() => setMetricType('sales')}
                            className={getToggleButtonClass(metricType === 'sales')}
                        >
                            Sales
                        </button>
                        <div className="h-6 w-px bg-neutral-600 mx-1" />
                        <button
                            onClick={() => setViewMode('daily')}
                            className={getToggleButtonClass(viewMode === 'daily')}
                        >
                            Daily
                        </button>
                        <button
                            onClick={() => setViewMode('cumulative')}
                            className={getToggleButtonClass(viewMode === 'cumulative')}
                        >
                            Cumulative
                        </button>
                    </div>
                </div>
                <div className="w-full h-96 mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        {metricType === 'profit' ? (
                            <AreaChart
                                data={data}
                                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                            >
                                <defs>
                                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00bc7d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#00bc7d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    stroke="#9ca3af"
                                    tick={{ fill: '#00bc7d', fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    tick={{ fill: '#00bc7d', fontSize: 12 }}
                                    label={{ value: 'Profit', angle: -90, position: 'insideLeft', fill: '#00bc7d' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#171717',
                                        border: '1px solid #00bc7d',
                                        borderRadius: '8px',
                                        color: '#ffffff'
                                    }}
                                    labelStyle={{ color: '#00bc7d' }}
                                    formatter={(value: any) => {
                                        if (value === null || value === undefined) return '';
                                        const numValue = typeof value === 'number' ? value : Number(value);
                                        if (isNaN(numValue)) return '';
                                        return formatProfit(numValue);
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={currentDataKey}
                                    stroke="#00bc7d"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#profitGradient)"
                                    name="Profit"
                                />
                            </AreaChart>
                        ) : (
                            <BarChart
                                data={data}
                                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                            >
                                <XAxis
                                    dataKey="date"
                                    stroke="#9ca3af"
                                    tick={{ fill: '#00bc7d', fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    tick={{ fill: '#00bc7d', fontSize: 12 }}
                                    label={{ value: 'Sales Count', angle: -90, position: 'insideLeft', fill: '#00bc7d' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#171717',
                                        border: '1px solid #00bc7d',
                                        borderRadius: '8px',
                                        color: '#ffffff',
                                        padding: '8px 12px'
                                    }}
                                    labelStyle={{ color: '#00bc7d' }}
                                    wrapperStyle={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        boxShadow: 'none'
                                    }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar
                                    dataKey={currentDataKey}
                                    fill="#00bc7d"
                                    fillOpacity={0.7}
                                    name="Sales"
                                />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </DashboardCard>
    )
}