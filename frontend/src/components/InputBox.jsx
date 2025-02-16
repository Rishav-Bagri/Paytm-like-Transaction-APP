export function InputBox({label,placeholder,onchange}){
    return <div>
        <div className="font-medium text-sm text-left py-2">
            {label}
        </div>
        <input type="text" onChange={onchange} placeholder={placeholder} className="w-full px-2 py-1 border"/>
    </div>
}