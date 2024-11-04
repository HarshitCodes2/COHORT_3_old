import React from 'react'

const Home = () => {
  return (
    <div style={{width:"90vw", margin:"auto"}}>
      <h1 style={{margin:"20px 0px"}}>Welcome to the <span style={{color:"#8e44ad"}}>Prop Drilling</span> Auth System Demo</h1>
      <h2>Today we are working with 
      <ul style={{padding:"30px"}}>
        <li>State lifting</li>
        <li>Prop drilling</li>
        <li>Context api</li>
      </ul>
      </h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Rerum nam harum nobis amet molestias numquam saepe voluptas nisi reprehenderit dolorem molestiae dicta, quidem delectus.<br/> Mollitia quae excepturi eveniet a dolor?</p>
    </div>
  )
}

const HomeContext = () => {
  return (
    <div style={{width:"90vw", margin:"auto"}}>
      <h1 style={{margin:"20px 0px"}}>Welcome to the <span style={{color:"#8e44ad"}}>Context API</span> Auth System Demo</h1>
      <h2>Today we are working with 
      <ul style={{padding:"30px"}}>
        <li>State lifting</li>
        <li>Prop drilling</li>
        <li>Context api</li>
      </ul>
      </h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Rerum nam harum nobis amet molestias numquam saepe voluptas nisi reprehenderit dolorem molestiae dicta, quidem delectus.<br/> Mollitia quae excepturi eveniet a dolor?</p>
    </div>
  )
}

export { Home, HomeContext }