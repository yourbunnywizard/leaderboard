import { useRef, useEffect, useState } from 'react';
import { User } from 'types/user_types';
import 'styles/components/score-item.styles.css';
import HelmetIcon from 'components/HelmetIcon';
import { getColor } from 'utils/getColor';
import { formatTime } from 'utils/formatTime';

interface IScoreItemProps {
	user: User;
	index: number;
	isActive: boolean;
	onItemClick: () => void;
}

const ScoreItem = ({ user, index, isActive, onItemClick }: IScoreItemProps) => {
	const scoreItemRef = useRef<HTMLDivElement>(null);
	const [isShow, setIsShow] = useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entrie = entries[0];
				if (entrie.isIntersecting) {
					setIsShow(true);
					//scoreItemRef.current?.classList.add('show');
					observer.unobserve(entrie.target);
				}
			},
			{ threshold: 0.4 }
		);

		if (scoreItemRef.current) {
			observer.observe(scoreItemRef.current);
		}
	}, []);

	return (
		<div
			className={`score-item ${isShow ? 'show' : ''} ${
				isActive ? 'active' : ''
			}`}
			ref={scoreItemRef}
			onClick={() => onItemClick()}
		>
			<span className="score-item__index">
				<b>{index + 1}</b>
			</span>
			<div>
				<HelmetIcon
					fillColor={getColor(user.color)}
					className="score-item__avatar"
				/>
			</div>
			<div className="score-item__user user">
				<span className="user__name">{user.name}</span>
				<span className="user__time">{formatTime(user.time)}</span>
				<span className="user__speed">{user.speed.toFixed(2)} км/год</span>
			</div>
		</div>
	);
};
export default ScoreItem;
