import React, { useState } from "react";
import "chart.js/auto";
import { Radar } from "react-chartjs-2";

function RadarChart(props) {
    useState({})
    const datas = props.keyword

    const data = {
        labels: [
          '교통',
          '자연',
          '교육',
          '소음',
          '편의시설',
        ],
        datasets: [{
          label: "Balance of Environments",
          data: [datas.교통, datas.자연, datas.교육, datas.소음, datas.편의시설],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      };
      const options = {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 60
            }
        }
    };
    return <Radar data={data} options={options} />;
};

export default RadarChart;