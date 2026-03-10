import ModernTemplate from "../templates/ModernTemplate"

function PortfolioPreview({data}){

return(

<div className="bg-light p-4 rounded">
{/*  using props concept to send data to the resume */}
<ModernTemplate data={data}/>

</div>

)

}

export default PortfolioPreview