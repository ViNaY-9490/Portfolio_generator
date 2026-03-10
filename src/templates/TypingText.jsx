import { useEffect, useState } from "react"

function TypingText({ text, speed = 60 }) {

const [displayText,setDisplayText] = useState("")

useEffect(()=>{

let index = 0
setDisplayText("")

const interval = setInterval(()=>{

index++

setDisplayText(text.slice(0,index))

if(index >= text.length){
clearInterval(interval)
}

},speed)

return ()=>clearInterval(interval)

},[text,speed])

return <span>{displayText}</span>

}

export default TypingText