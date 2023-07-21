import { User } from 'types/user_types';
import { useState, useEffect, useRef } from 'react';
import ScoreItem from './ScoreItem';
import 'styles/components/score-table.styles.css';
import { useRandomData } from 'hooks/useRandomData';

const ScoreTable = () => {
	const scoreLoadeRef = useRef<HTMLDivElement>(null);
	const [usersList, setUsersList] = useState<User[]>([]);
	const { isLoading, generateUsers } = useRandomData();
	const [selectedItem, setSelectedItem] = useState<number | null>(null);

	useEffect(() => {
		const loader = scoreLoadeRef.current;
		if (!loader) return;

		async function getUsers() {
			try {
				const users = await generateUsers();
				setUsersList((state) => [...state, ...users]);
			} catch (e) {
				setUsersList([]);
			}
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const entrie = entries[0];
				if (entrie.isIntersecting) {
					console.log('intersecting');
					observer.unobserve(entrie.target);

					getUsers()
						.catch((e) => {
							console.error('Error fetching users:', e);
							setUsersList([]);
						})
						.finally(() => observer.observe(entrie.target));
				}
			},
			{ threshold: 1.0 }
		);

		observer.observe(loader);

		return () => {
			observer.unobserve(loader);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="score-table">
			<h1>Таблиця рекордів</h1>
			{usersList.map((item, index) => (
				<ScoreItem
					key={index}
					user={item}
					index={index}
					isActive={selectedItem === index}
					onItemClick={() => setSelectedItem(index)}
				/>
			))}

			<div ref={scoreLoadeRef} style={{ height: '40px', textAlign: 'center' }}>
				{isLoading && 'loading...'}
			</div>
		</div>
	);
};

export default ScoreTable;
