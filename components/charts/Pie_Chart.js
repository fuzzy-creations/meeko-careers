
import { Pie } from 'react-chartjs-2';

function Pie_Chart (props) {

    const _data = props.data;
    const _labels = props.labels

    const data = {
        labels: _labels,
  
        datasets: [{
            label: 'My First dataset',
          data: _data,
          backgroundColor: [
              '#7d7ddc',
              '#fd8567',
              '#f5a002',
          '#69b996',
          '#ff6688',
          '#e66e50'
          ],
          hoverBackgroundColor: [
              '#7d7ddc',
              '#fd8567',
              '#f5a002',
            '#69b996',
            '#ff6688',
            '#e66e50'
          ]
        }]
      };

    const options = {
        maintainAspectRatio: true, 
        plugins: {
            legend: {
                display: false,
                reverse: true
            },
        }
    }



    
      return (
        <div style={{width: "70%"}}>
            <Pie data={data} width={10} height={10} options={options} />
        </div>
      );
    
}

export default Pie_Chart;