import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image
                src='/loader2.gif'
                alt="loader"
                width={ 220 }
                height={ 220 }
                priority={ true }
            />
        </div>
    )
}