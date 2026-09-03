import { useState } from 'react'

const Statistics = (props) => {
  const {goodCount, neutralCount, badCount} = props;

  if(goodCount == 0 && neutralCount == 0 && badCount == 0)
  {
    return (
      <p>No feedback given</p>
    )
  }

  const total = goodCount + neutralCount + badCount;
  const average = (goodCount - badCount) / total;
  const positive = (goodCount / total) * 100;

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text='good' value={goodCount} />
          <StatisticsLine text='neutral' value={neutralCount} />
          <StatisticsLine text='bad' value={badCount} />
          <StatisticsLine text='total' value={total} />
          <StatisticsLine text='average' value={average} />
          <StatisticsLine text='positive' value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  const {onClick, label} = props;
  return (
    <button onClick={onClick}>{label}</button>
  )
}

const StatisticsLine = (props) => {
  const {text, value} = props;

  if(text === 'positive')
  {
    return (
      <tr>
        <td>{text}</td> 
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

function App() {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const handleGoodButton = () => {
    setGoodCount(goodCount + 1)
  }

  const handleNeutralButton = () => {
    setNeutralCount(neutralCount + 1)
  }

  const handleBadButton = () => {
    setBadCount(badCount + 1)
  }

  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodButton} label='good' />
      <Button onClick={handleNeutralButton} label='neutral' />
      <Button onClick={handleBadButton} label='bad' />
      <h1>statistics</h1>
      <Statistics 
        goodCount={goodCount} 
        neutralCount={neutralCount} 
        badCount={badCount}
      />
      
    </div>
  )
}

export default App
