import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			<aside style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc' }}>
				<Link href='/admin/gruhlar'>Guruhlar</Link>
				<br />
				<Link href='/admin/kanalar'>Kanallar</Link>
				<br />
				<Link href='/admin/botlar'>Botlar</Link>
				<br />
				<Link href='/admin/xabarlar'>Xabarlar</Link>
			</aside>

			<main style={{ padding: '20px', flex: 1 }}>{children}</main>
		</div>
	);
}
