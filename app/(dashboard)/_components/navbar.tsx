"use client"

import { OrganizationSwitcher, UserButton, useOrganization } from '@clerk/nextjs';
import {SearchInput} from './search-input';
import { InviteButton } from './invite-button';

export const Navbar = () => {
const {organization} = useOrganization();
    return (
        <header className="flex items-center gap-x-4 p-5">
            Navbar
            <div className="hidden lg:flex lg:flex-1 ">
                
                {/* Only visible on the Desktop Size */}
                <SearchInput/>
            </div>
            <div
            className="block lg:hidden flex-1" 
            >
                <OrganizationSwitcher
        //hidePersonal wil remove the personal organiztion
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "376px",
            },
            //Below is for the Border
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />

            </div>

            {
                organization && (
                    <InviteButton />
                )   
            }
            <UserButton />
        </header>
    )
}