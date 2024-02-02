import Image from "next/image"


export const EmptySearch = () => {
    return(
        <div>
            <Image
            src="/empty-search.svg"
            alt="Empty"
            height={140}
            width={140}
            />
            <h2 className="text-2xl font-semibold mt-6">
                No results found!
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Try a different search term or refine your search.
            </p>
        </div>
    )
}