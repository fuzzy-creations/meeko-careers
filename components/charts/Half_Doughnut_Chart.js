
import { Doughnut } from 'react-chartjs-2';

function Half_Doughnut_Chart (props) {

    const _data = props.data;
    const _labels = props.labels

    const data = {
        labels: _labels,
  
        datasets: [{
            label: 'My First dataset',
          data: _data,
          backgroundColor: [
              '#fd8567',
              '#eeeeee',
              '#f5a002',
          '#69b996',
          '#ff6688',
          '#e66e50'
          ],
          hoverBackgroundColor: [
              '#fd8567',
              '#eeeeee',
              '#f5a002',
            '#69b996',
            '#ff6688',
            '#e66e50'
          ]
        }]
      };

    const options = {
        maintainAspectRatio: true, 
        circumference: 180,
        rotation: -90,
        plugins: {
            legend: {
                display: false,
                reverse: true
            },
        }
    }



    
      return <Doughnut data={data} width={10} height={10} options={options} />
    
}

export default Half_Doughnut_Chart;