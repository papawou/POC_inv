NAME := project
SRC := docker-compose.yml

DOCKER_COMPOSE_CMD := docker compose -f ${SRC} -p ${NAME}
TARGET_DEV := cat docker-compose.yml | sed 's/target: starter/target: builder/' | docker compose -f - -p ${NAME} up --build -d

all: down build up

build:
	${DOCKER_COMPOSE_CMD} build

up:
	${DOCKER_COMPOSE_CMD} up

frontend_dev:
	${TARGET_DEV} frontend
	docker attach project-frontend-1

backend_dev:
	${TARGET_DEV} backend
	docker attach project-backend-1

database_dev:
	${TARGET_DEV} database
	docker attach project-database-1

frontend:
	${DOCKER_COMPOSE_CMD} up --build frontend

backend:
	${DOCKER_COMPOSE_CMD} up --build backend

database:
	${DOCKER_COMPOSE_CMD} up --build database

down:
	${DOCKER_COMPOSE_CMD} down

clean:
	${DOCKER_COMPOSE_CMD} down -v

re : clean all

.PHONY : all clean fclean re backend frontend database