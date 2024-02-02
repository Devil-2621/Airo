<<<<<<< HEAD
export default function DashboardPage() {
	return (
		<main className='flex flex-col gap-y-4'>
			Hello Dashboard Page
		</main>
	);
=======
"use client"

import { useOrganization } from '@clerk/nextjs';
import { EmptyOrg } from './_components/empty-org';
import { BoardList } from './_components/board-list';

interface DashboardPageProps {
	searchParams: {
		search?: string;
		favorites?: string;
	}
>>>>>>> b10ffbd9204f4e4d7e09c7d55dbcf6f328198ea9
}

const DashboardPage = ({
	searchParams,
  }: DashboardPageProps) => {
	const { organization } = useOrganization();
  
	return ( 
	  <div className="flex-1 h-[calc(100%-80px)] p-6">
		{!organization ? (
		  <EmptyOrg />
		) : (
			<BoardList
			orgId={organization.id}
			query={searchParams}
			/>
		)}
	  </div>
	 );
  };
   
  export default DashboardPage;