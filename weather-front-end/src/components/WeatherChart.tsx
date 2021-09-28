import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, Label, Cell, ResponsiveContainer } from "recharts";
import { ChartData } from '../types/typesInfo';
import moment from 'moment'

type ChartProps = {
    chartInfo: ChartData;
    onClickedBar: (data: ChartData, index: number) => void;
    indexSelected: number;
};

const WeatherChart: React.FC<ChartProps> = ({ chartInfo, onClickedBar, indexSelected }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const formatXAxis = (tickItem: Date) => {
        return moment(tickItem).format('DD-MMM')
    }

    return (
        <div

            className="grid-chart-container"
        >
            <ResponsiveContainer width="100%" height={300} >
                <BarChart
                    data={chartInfo as any}
                    margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
                >
                    <XAxis dataKey="date" height={50} tickFormatter={formatXAxis} >
                        <Label value="Date" height={50} offset={5} position="insideBottom" />
                    </XAxis>
                    <YAxis label={{ value: 'Temperature in C', angle: -90, textAnchor: 'center' }} />
                    <Bar dataKey="value" fill="#8884d8" barSize={50} onClick={onClickedBar}>
                        {
                            chartInfo.map((entry: ChartData, index: number) => (
                                <Cell cursor="pointer" fill={index === indexSelected ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherChart;
