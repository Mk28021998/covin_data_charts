// Write your code here
import './index.css'
import {PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationAgeDetails} = props
  return (
    <div className="vaccination-by-age-cont">
      <h1 className="heading">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationAgeDetails}
          cx="50%"
          cy="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="60 Above" fill="#64c2a6" />
        </Pie>

        <Legend
          iconType="circle"
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{fontSize: 12, fontFamily: 'roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
