import './styles/home.css'

export const Home = () => {
  return (
    <>
      <span class="parallax-text" text="STACKS">
        STACKS
      </span>

      <img src={require('./styles/images/ow97.png')} alt="Nike1" />
      <img src={require('./styles/images/offwhiteC.png')} alt="Nike2" />
      <img src={require("./styles/images/offwhiteair.png")} alt="Nike3" />
    </>
  )
}