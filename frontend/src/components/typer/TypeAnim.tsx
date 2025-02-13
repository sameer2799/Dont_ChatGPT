import { TypeAnimation } from 'react-type-animation';

const TypeAnim = () => {
  return (
    <TypeAnimation
        sequence={[
            // Same substring at the start will only be typed once, initially
            'Chat with your own AI',
            1000,
            'Chat with your own Assistant',
            2000,
            'Built with custom ChatGPT',
            1500
        ]}
        speed={50}
        style={{ fontSize: '60px', color: 'white', display: 'inline-block', textShadow: '1px 1px 20px #000'}}
        repeat={Infinity}
    />
  )
}

export default TypeAnim