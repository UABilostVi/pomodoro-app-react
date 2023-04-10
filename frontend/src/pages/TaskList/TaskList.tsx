import React, { FC, useState } from 'react';
// import { TaskModal } from './TaskModal';

const TaskList: FC = () => {
	const [isActiveModal, setActiveModal] = useState(true);
	return (
		<>
			<div>TaskList</div>
			{/* <TaskModal activeModal={isActiveModal} setActiveModal={setActiveModal} /> */}
		</>
	);
};

export default TaskList;
