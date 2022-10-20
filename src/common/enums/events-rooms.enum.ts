export enum GATEWAY_EVENTS {
	ADD_FRIEND = 'add_friend',
	INVITE_TO_ROOM = 'invite_to_room',
	JOIN_TO_ROOM = 'join_to_room',
	GET_ALL_ROOMS = 'get_all_rooms',
	CREATE_GAME = 'create_game',
	GET_GAME = 'get_game',
	GET_GAME_ACTION_TIMER = 'get_game_action_timer',
	KICK_USER_FROM_ROOM = 'kick_user_from_room',
	HANDLE_CONNECT_TO_GAME = 'connect_to_game',
}

export enum SOCKET_ROOM_EVENTS {
	CREATED_SOCKET_ROOM = 'created_socket_room',
	JOIN_SOCKET_ROOM = 'join_socket_room',
	LEAVE_SOCKET_ROOM = 'leave_socket_room',
}
