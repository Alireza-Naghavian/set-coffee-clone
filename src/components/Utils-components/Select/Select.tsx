import { ChangeEventHandler } from 'react'
type SelectType ={
    value:string,
    onChange:ChangeEventHandler<HTMLSelectElement>,
    className?:string,
    optionClassName?:string
    selectTitle:string,
    options:any
}
function Select({value,onChange,options,className,selectTitle,optionClassName}:SelectType) {
  return (
    <div className="flex flex-col gap-y-2 justify-end ">
<span className="text-sm  text-right text-dark_shade font-Shabnam_M">
                <span className="hidden md:block">{selectTitle}</span>
              </span>
    <select  value={value} onChange={onChange} className={className}>
    {options&& options.map((item:any,index:number)=>{
        return(<option  key={index} value={item?.value} 
            className={`focus:outline-none focus:border-none 
                        rounded-lg bg-white  ${optionClassName}`} >
        {item.label}
    </option>)

})}
</select>
</div>
  )
}

export default Select