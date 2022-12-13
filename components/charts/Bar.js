
import { Bar } from 'react-chartjs-2';

function Bar_Chart (props) {

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
    labels: labels,
    datasets: [
        {
          label: 'Dataset 1',
          data: [65, 59, 80, 81, 56, 55, 40, 55, 66, 77, 88, 90],
          backgroundColor: '#fd8567',
          barThickness: 10, 
          borderRadius: 100,
        }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        }, 
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                }, 
            },
            y: {
                display: false,
            }
          }
    }




    
      return <Bar data={data} options={options} width={10} height={3} />
    
}

export default Bar_Chart;