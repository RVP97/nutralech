"use client";

import { Ban, Mic, Play, Reply, Star } from "lucide-react";
import type { ReactNode } from "react";
import type { LinkPreview, Message } from "./data";
import { Tail, TickIcon } from "./icons";

export const OUT_BG = "#D9FDD3";
export const IN_BG = "#FFFFFF";

/** WhatsApp inline formatting: *bold*, _italic_, ~strike~. */
export function formatText(text: string): ReactNode[] {
	const out: ReactNode[] = [];
	const re = /(\*[^*\n]+\*|_[^_\n]+_|~[^~\n]+~)/g;
	let last = 0;
	for (const m of text.matchAll(re)) {
		const i = m.index ?? 0;
		if (i > last) out.push(text.slice(last, i));
		const inner = m[0].slice(1, -1);
		const key = `${i}-${inner}`;
		if (m[0][0] === "*")
			out.push(
				<strong key={key} className="font-semibold">
					{inner}
				</strong>,
			);
		else if (m[0][0] === "_") out.push(<em key={key}>{inner}</em>);
		else out.push(<s key={key}>{inner}</s>);
		last = i + m[0].length;
	}
	if (last < text.length) out.push(text.slice(last));
	return out;
}

function Meta({ msg, overlay }: { msg: Message; overlay?: boolean }) {
	return (
		<span
			className={`flex items-center gap-[3px] text-[11.5px] leading-none tabular-nums ${
				overlay ? "absolute bottom-[6px] right-[8px]" : ""
			} text-[#667781]`}
		>
			{msg.starred && (
				<Star className="size-[10px] fill-current" strokeWidth={0} />
			)}
			{msg.time}
			{msg.from === "me" && msg.status && !msg.deleted && (
				<TickIcon status={msg.status} className="text-[#8696A0]" />
			)}
		</span>
	);
}

export function LinkCard({
	link,
	mine,
	onOpen,
}: {
	link: LinkPreview;
	mine: boolean;
	onOpen?: (link: LinkPreview) => void;
}) {
	return (
		<button
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				onOpen?.(link);
			}}
			className={`mb-[4px] flex w-full overflow-hidden rounded-[8px] text-left active:opacity-80 ${
				mine ? "bg-[#CFF3C9]" : "bg-[#F5F6F6]"
			}`}
		>
			{link.image && (
				// biome-ignore lint/performance/noImgElement: tiny decorative thumb inside a transformed mockup
				<img
					src={link.image}
					alt=""
					className="size-[76px] shrink-0 object-cover object-[50%_30%]"
					draggable={false}
				/>
			)}
			<span className="flex min-w-0 flex-col justify-center gap-[2px] px-[10px] py-[8px]">
				<span className="line-clamp-2 text-[14px] font-semibold leading-[18px] text-[#111B21]">
					{link.title}
				</span>
				<span className="line-clamp-2 text-[13px] leading-[16px] text-[#667781]">
					{link.description}
				</span>
				<span className="text-[12px] text-[#8696A0]">{link.domain}</span>
			</span>
		</button>
	);
}

interface BubbleProps {
	msg: Message;
	first: boolean;
	last: boolean;
	group?: boolean;
	highlight?: boolean;
	onButton?: (label: string) => void;
	onLink?: (link: LinkPreview) => void;
	onQuote?: (id: string) => void;
}

export function Bubble({
	msg,
	first,
	last,
	group,
	highlight,
	onButton,
	onLink,
	onQuote,
}: BubbleProps) {
	const mine = msg.from === "me";
	const bg = mine ? OUT_BG : IN_BG;
	const hasButtons = !!msg.buttons?.length && !msg.deleted;
	const spacer = mine ? (msg.starred ? 80 : 66) : msg.starred ? 56 : 42;

	return (
		<div className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
			<div
				className="relative max-w-[82%] drop-shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
				style={{ minWidth: msg.link ? 250 : undefined }}
			>
				<div
					className="relative px-[9px] pb-[7px] pt-[6px] text-[17px] leading-[22px] tracking-[-0.2px] text-[#111B21] transition-[filter] duration-500"
					style={{
						background: bg,
						borderRadius: 18,
						borderBottomRightRadius: hasButtons ? 8 : mine && last ? 4 : 18,
						borderBottomLeftRadius: hasButtons ? 8 : !mine && last ? 4 : 18,
						filter: highlight ? "brightness(0.88)" : undefined,
					}}
				>
					{group && !mine && first && msg.author && (
						<div
							className="mb-[1px] text-[14px] font-semibold leading-[18px]"
							style={{ color: msg.authorColor }}
						>
							{msg.author}
						</div>
					)}

					{msg.replyTo && !msg.deleted && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onQuote?.(msg.replyTo?.id ?? "");
							}}
							className={`mb-[5px] mt-[2px] flex w-full min-w-[160px] overflow-hidden rounded-[8px] text-left ${
								mine ? "bg-[#C6ECBF]/80" : "bg-[#F0F2F5]"
							}`}
						>
							<span
								className="w-[4px] shrink-0"
								style={{ background: msg.replyTo.color ?? "#06CF9C" }}
							/>
							<span className="min-w-0 px-[8px] py-[5px]">
								<span
									className="block text-[14px] font-semibold leading-[18px]"
									style={{ color: msg.replyTo.color ?? "#06CF9C" }}
								>
									{msg.replyTo.mine ? "Tú" : msg.replyTo.author}
								</span>
								<span className="line-clamp-2 text-[14px] leading-[18px] text-[#667781]">
									{msg.replyTo.text}
								</span>
							</span>
						</button>
					)}

					{msg.link && !msg.deleted && (
						<LinkCard link={msg.link} mine={mine} onOpen={onLink} />
					)}

					{msg.deleted ? (
						<span className="flex items-center gap-[5px] italic text-[#8696A0]">
							<Ban className="size-[15px]" strokeWidth={1.8} />
							{mine ? "Eliminaste este mensaje." : "Se eliminó este mensaje."}
							<span className="inline-block" style={{ width: spacer - 20 }} />
						</span>
					) : msg.audio ? (
						<span className="flex w-[230px] items-center gap-[10px] pb-[10px]">
							<Play className="size-[22px] fill-[#8696A0] text-[#8696A0]" />
							<span className="flex h-[26px] flex-1 items-center gap-[2px]">
								{Array.from({ length: 30 }, (_, i) => (
									<span
										key={i}
										className="w-[2.5px] rounded-full bg-[#B4BBBF]"
										style={{
											height: `${25 + Math.abs(Math.sin(i * 1.7) * 70)}%`,
										}}
									/>
								))}
							</span>
							<span className="relative">
								<span className="block size-[36px] rounded-full bg-[#DFE5E7]" />
								<Mic className="absolute -bottom-[2px] -left-[4px] size-[16px] text-[#1DAA61]" />
							</span>
							<span className="absolute bottom-[6px] left-[42px] text-[11.5px] text-[#667781]">
								{msg.audio}
							</span>
						</span>
					) : (
						<span className="whitespace-pre-wrap break-words">
							{formatText(msg.text)}
							<span className="inline-block" style={{ width: spacer }} />
						</span>
					)}
					<Meta msg={msg} overlay />
				</div>
				{last && !hasButtons && <Tail side={mine ? "out" : "in"} color={bg} />}

				{hasButtons && (
					<div className="mt-[2px] flex flex-col gap-[2px]">
						{msg.buttons?.map((b, i, arr) => (
							<button
								type="button"
								key={b}
								onClick={(e) => {
									e.stopPropagation();
									onButton?.(b);
								}}
								className="flex h-[42px] items-center justify-center gap-[6px] bg-white text-[16px] font-medium text-[#027EB5] active:bg-[#F0F2F5]"
								style={{
									borderRadius: 18,
									borderTopLeftRadius: 8,
									borderTopRightRadius: 8,
									borderBottomLeftRadius: i === arr.length - 1 ? 18 : 8,
									borderBottomRightRadius: i === arr.length - 1 ? 18 : 8,
								}}
							>
								<Reply className="size-[16px]" strokeWidth={2} />
								{b}
							</button>
						))}
					</div>
				)}

				{(msg.reactions?.me || msg.reactions?.them) && (
					<span
						className={`absolute -bottom-[18px] z-10 flex h-[26px] items-center gap-[1px] rounded-full border-2 border-[#EFEAE2] bg-white px-[5px] text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] ${
							mine ? "right-[10px]" : "left-[10px]"
						}`}
					>
						{msg.reactions.them && <span>{msg.reactions.them}</span>}
						{msg.reactions.me && msg.reactions.me !== msg.reactions.them && (
							<span>{msg.reactions.me}</span>
						)}
						{msg.reactions.me && msg.reactions.them && (
							<span className="ml-[2px] text-[12px] text-[#667781]">2</span>
						)}
					</span>
				)}
			</div>
		</div>
	);
}
