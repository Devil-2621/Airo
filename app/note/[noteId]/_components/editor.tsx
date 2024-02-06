'use client';

import {
	BlockNoteEditor,
	uploadToTmpFilesDotOrg_DEV_ONLY,
} from '@blocknote/core';
import {
	BlockNoteView,
	useBlockNote,
	FormattingToolbarPositioner,
	HyperlinkToolbarPositioner,
	SideMenuPositioner,
	SlashMenuPositioner,
	ToggledStyleButton,
	Toolbar,
	ToolbarButton,
	useEditorContentChange,
	useEditorSelectionChange,
	ImageToolbarPositioner,
	TextAlignButton,
	ColorStyleButton,
	NestBlockButton,
	UnnestBlockButton,
	CreateLinkButton,
	ReplaceImageButton,
	ImageCaptionButton,
	BlockTypeDropdown,
	createReactInlineContentSpec,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import * as Y from 'yjs';
import LiveblocksProvider from '@liveblocks/yjs';
import { useRoom, useSelf } from '@/liveblocks.config';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
	const room = useRoom();
	const [doc, setDoc] = useState<Y.Doc>();
	const [provider, setProvider] = useState<any>();

	// Set up Liveblocks Yjs provider
	useEffect(() => {
		const yDoc = new Y.Doc();
		const yProvider = new LiveblocksProvider(room, yDoc);
		setDoc(yDoc);
		setProvider(yProvider);

		return () => {
			yDoc?.destroy();
			yProvider?.destroy();
		};
	}, [room]);

	if (!doc || !provider) {
		return null;
	}

	return (
		<BlockNote
			doc={doc}
			provider={provider}
		/>
	);
}

type EditorProps = {
	doc: Y.Doc;
	provider: any;
};

function BlockNote({ doc, provider }: EditorProps) {
	// Get user info from Liveblocks authentication endpoint
	const userInfo = useSelf((me) => me.info);

	const editor: BlockNoteEditor = useBlockNote({
		uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
		// uploadFile: (file: File) => Promise<string>,
		
		collaboration: {
			provider,

			// Where to store BlockNote data in the Y.Doc:
			fragment: doc.getXmlFragment('document-store'),

			// Information for this user:
			user: {
				name: userInfo.name,
				color: userInfo.color,
			},
		},
	});

	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	const changeTheme = useCallback(() => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', newTheme);
		setTheme(newTheme);
	}, [theme]);

	const CustomFormattingToolbar = (props: { editor: BlockNoteEditor }) => {
		// Tracks whether the text & background are both blue.
		const [isSelected, setIsSelected] = useState<boolean>(
			props.editor.getActiveStyles().textColor === 'blue' &&
				props.editor.getActiveStyles().backgroundColor === 'blue'
		);

		// Updates state on content change.
		useEditorContentChange(props.editor, () => {
			setIsSelected(
				props.editor.getActiveStyles().textColor === 'blue' &&
					props.editor.getActiveStyles().backgroundColor === 'blue'
			);
		});

		// Updates state on selection change.
		useEditorSelectionChange(props.editor, () => {
			setIsSelected(
				props.editor.getActiveStyles().textColor === 'blue' &&
					props.editor.getActiveStyles().backgroundColor === 'blue'
			);
		});

		return (
			<Toolbar>
				<BlockTypeDropdown {...props} />

				<ImageCaptionButton editor={props.editor} />
				<ReplaceImageButton editor={props.editor} />

				<ToggledStyleButton
					editor={props.editor}
					toggledStyle={'bold'}
				/>
				<ToggledStyleButton
					editor={props.editor}
					toggledStyle={'italic'}
				/>
				<ToggledStyleButton
					editor={props.editor}
					toggledStyle={'underline'}
				/>
				<ToggledStyleButton
					editor={props.editor}
					toggledStyle={'strike'}
				/>
				{/* Added code toggle button */}
				<ToggledStyleButton
					editor={props.editor}
					toggledStyle={'code'}
				/>

				<TextAlignButton
					editor={props.editor as any}
					textAlignment={'left'}
				/>
				<TextAlignButton
					editor={props.editor as any}
					textAlignment={'center'}
				/>
				<TextAlignButton
					editor={props.editor as any}
					textAlignment={'right'}
				/>

				<ColorStyleButton editor={props.editor} />

				<NestBlockButton editor={props.editor} />
				<UnnestBlockButton editor={props.editor} />

				<CreateLinkButton editor={props.editor} />
			</Toolbar>
		);
	};

	// type BlockNoteEditorOptions = Partial<{
	// 	uploadFile: (file: File) => Promise<string>;
	// }>;

	return (
		<div className='w-6xl h-full flex flex-col justify-center items-center overflow-scroll mt-4 -z-9'>
			<header className='pt-8 -z-5 max-sm:pt-32'>
				<Button
					className=''
					variant='outline'
					onClick={changeTheme}
					aria-label='Switch Theme'
				>
					{theme === 'dark' ? (
						<SunIcon style={{ width: '20px' }} />
					) : (
						<MoonIcon style={{ width: '20px' }} />
					)}
				</Button>
			</header>
			<div className='w-[60%] max-2xl:w-[75%] max-xl:w-[85%] max-lg:w-[90%] max-md:w-[95%] max-sm:w-[100%] h-full'>
				<div className='flex flex-col justify-center items-center bg-white rounded-lg mx-4 my-2 p-4'>
					<h1 className='max-sm:text-2xl max-md:text-4xl max-lg:text-4xl text-6xl h-[50px] my-2 font-semibold font-sans'>
						<span className='max-sm:text-2xl max-md:text-4xl max-lg:text-4xl text-6xl bg-yellow-100 rounded-full px-4 pb-1'>
							Notes📝
						</span>{' '}
						at your command.
					</h1>
					<p className='max-sm:text-xs max-md:text-sm max-lg:text-md max-xl:text-lg text-wrap mt-6 max-sm:mt-1 max-md:mt-2 max-lg:mt-4 font-sans font-normal'>
						This is wonderful right? gonna fall in{' '}
						<span className='bg-red-100 rounded-full font-semibold px-2'>
							💖Love
						</span>{' '}
						with{' '}
						<a
							href='/'
							className='rounded-full bg-purple-200 px-2 font-semibold'
						>
							Airo
						</a>
						😃🚀
					</p>
				</div>
				<BlockNoteView
					editor={editor}
					className='p-4 pt-2'
					theme={theme}
				>
					<FormattingToolbarPositioner
						editor={editor}
						formattingToolbar={CustomFormattingToolbar}
					/>
					<HyperlinkToolbarPositioner editor={editor} />
					<SlashMenuPositioner editor={editor} />
					<SideMenuPositioner editor={editor} />
					<ImageToolbarPositioner editor={editor} />
				</BlockNoteView>
			</div>
		</div>
	);
}