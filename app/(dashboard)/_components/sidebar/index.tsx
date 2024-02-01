import { List } from "./list"
import { NewButton } from "./new-button"

const Sidebar = () => {
    return (
        <aside className="fixed z-[1] bg-[#9f84ff] h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
            <List />
            <NewButton />
        </aside>
    )
}

export default Sidebar