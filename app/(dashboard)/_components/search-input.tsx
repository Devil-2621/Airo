"use client"

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "usehooks-ts";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import { Input } from "@/components/ui/input";

const SearchInput = () => {

    const router = useRouter();
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value, 500);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }


    useEffect(() =>{
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                search: debounceValue
            },
        },{skipEmptyString: true, skipNull: true})
        router.push(url)

    },[debounceValue,router])


  return (
    <div
    className="w-full relative"
    >
    <Search
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
    />
    <Input
    className="w-full max-w-[516px] p1-9"
    placeholder="Search Boards"
    onChange={handleChange}
    value={value}
    />
    </div>
  )
}

export default SearchInput