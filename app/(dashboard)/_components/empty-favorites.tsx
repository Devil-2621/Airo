import Image from "next/image"


export const EmptyFavorites = () => {
    return(
        <div className="flex flex-col h-full justify-center items-center">
            <Image
            src="/empty-favorites.svg"
            alt="Empty"
            height={140}
            width={140}
            />
            <h2 className="text-2xl font-semibold mt-6">
                No results found!
            </h2>
            <p>
                Try a different search term or refine your search.
            </p>
        </div>
    )
}