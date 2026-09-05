const Header = (props) => <h2>{props.course}</h2>

const Content = ({parts}) => {
  const partsArray = parts.map((x) => {
      return <Part key={x.id} part={x} />
  })

  return (
    <div>
      {partsArray}
    </div>
  )
  
}

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0)

  return (
    <p><b>Number of exercises {total}</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course;