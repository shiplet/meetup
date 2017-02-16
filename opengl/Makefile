OBJS = main.cpp

CC = clang++

INCLUDE_PATHS = -I/usr/local/include -I/opt/X11/include

LIBRARY_PATHS = -L/usr/local/lib -I/opt/X11/lib

COMPILER_FLAGS = -w

LINKER_FLAGS = -framework OpenGL -lglfw -lglew

OBJ_NAME = main

all : $(OBJS)
	$(CC) $(OBJS) $(INCLUDE_PATHS) $(LIBRARY_PATHS) $(COMPILER_FLAGS) $(LINKER_FLAGS) -o $(OBJ_NAME)