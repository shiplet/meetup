
#include <stdio.h>
#include <stdlib.h>


#include <GL/glew.h>


#include <GLFW/glfw3.h>
GLFWwindow* window;


#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
using namespace glm;

#include "./common/loadShader.cpp";
#include "./common/loadBMP.cpp";
#include "./common/controls.cpp";

int main( void )
{

    if( !glfwInit() )
    {
        fprintf( stderr, "Failed to initialize GLFW\n" );
        getchar();
        return -1;
    }

    glfwWindowHint(GLFW_SAMPLES, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);


    window = glfwCreateWindow( 720, 450, "OpenGL Example", NULL, NULL);
    if( window == NULL ){
        fprintf( stderr, "Failed to open GLFW window. If you have an Intel GPU, they are not 3.3 compatible. Try the 2.1 version of the tutorials.\n" );
        getchar();
        glfwTerminate();
        return -1;
    }
    glfwMakeContextCurrent(window);


    glewExperimental = true;
    if (glewInit() != GLEW_OK) {
        fprintf(stderr, "Failed to initialize GLEW\n");
        getchar();
        glfwTerminate();
        return -1;
    }


    glfwSetInputMode(window, GLFW_STICKY_KEYS, GL_TRUE);
    glClearColor(0.0f, 0.0f, 0.0f, 0.0f);

    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LESS);
    glEnable(GL_CULL_FACE);

    GLuint VertexArrayID;
    glGenVertexArrays(1, &VertexArrayID);
    glBindVertexArray(VertexArrayID);


    GLuint programID = LoadShaders( "SimpleVertexShader.vertexshader", "SimpleFragmentShader.fragmentshader" );

    GLuint CubeMatrixID = glGetUniformLocation(programID, "MVP");

    GLuint Texture = LoadBMP("./textures/dirt.bmp");

    GLuint TextureID = glGetUniformLocation(programID, "myTextureSampler");

    static const GLfloat g_vertex_buffer_data_cube[] = {
     -1.0f,-1.0f,-1.0f,
     -1.0f,-1.0f, 1.0f,
     -1.0f, 1.0f, 1.0f,
     1.0f, 1.0f,-1.0f,
     -1.0f,-1.0f,-1.0f,
     -1.0f, 1.0f,-1.0f,
     1.0f,-1.0f, 1.0f,
     -1.0f,-1.0f,-1.0f,
     1.0f,-1.0f,-1.0f,
     1.0f, 1.0f,-1.0f,
     1.0f,-1.0f,-1.0f,
     -1.0f,-1.0f,-1.0f,
     -1.0f,-1.0f,-1.0f,
     -1.0f, 1.0f, 1.0f,
     -1.0f, 1.0f,-1.0f,
     1.0f,-1.0f, 1.0f,
     -1.0f,-1.0f, 1.0f,
     -1.0f,-1.0f,-1.0f,
     -1.0f, 1.0f, 1.0f,
     -1.0f,-1.0f, 1.0f,
     1.0f,-1.0f, 1.0f,
     1.0f, 1.0f, 1.0f,
     1.0f,-1.0f,-1.0f,
     1.0f, 1.0f,-1.0f,
     1.0f,-1.0f,-1.0f,
     1.0f, 1.0f, 1.0f,
     1.0f,-1.0f, 1.0f,
     1.0f, 1.0f, 1.0f,
     1.0f, 1.0f,-1.0f,
     -1.0f, 1.0f,-1.0f,
     1.0f, 1.0f, 1.0f,
     -1.0f, 1.0f,-1.0f,
     -1.0f, 1.0f, 1.0f,
     1.0f, 1.0f, 1.0f,
     -1.0f, 1.0f, 1.0f,
     1.0f,-1.0f, 1.0f
 };

 static const GLfloat g_uv_buffer_data_cube[] = {
    0.000059f, 1.0f-0.000004f,
    0.000103f, 1.0f-0.336048f,
    0.335973f, 1.0f-0.335903f,
    1.000023f, 1.0f-0.000013f,
    0.667979f, 1.0f-0.335851f,
    0.999958f, 1.0f-0.336064f,
    0.667979f, 1.0f-0.335851f,
    0.336024f, 1.0f-0.671877f,
    0.667969f, 1.0f-0.671889f,
    1.000023f, 1.0f-0.000013f,
    0.668104f, 1.0f-0.000013f,
    0.667979f, 1.0f-0.335851f,
    0.000059f, 1.0f-0.000004f,
    0.335973f, 1.0f-0.335903f,
    0.336098f, 1.0f-0.000071f,
    0.667979f, 1.0f-0.335851f,
    0.335973f, 1.0f-0.335903f,
    0.336024f, 1.0f-0.671877f,
    1.000004f, 1.0f-0.671847f,
    0.999958f, 1.0f-0.336064f,
    0.667979f, 1.0f-0.335851f,
    0.668104f, 1.0f-0.000013f,
    0.335973f, 1.0f-0.335903f,
    0.667979f, 1.0f-0.335851f,
    0.335973f, 1.0f-0.335903f,
    0.668104f, 1.0f-0.000013f,
    0.336098f, 1.0f-0.000071f,
    0.000103f, 1.0f-0.336048f,
    0.000004f, 1.0f-0.671870f,
    0.336024f, 1.0f-0.671877f,
    0.000103f, 1.0f-0.336048f,
    0.336024f, 1.0f-0.671877f,
    0.335973f, 1.0f-0.335903f,
    0.667969f, 1.0f-0.671889f,
    1.000004f, 1.0f-0.671847f,
    0.667979f, 1.0f-0.335851f
};

static GLfloat g_transform_buffer_cube[12*3*3];
for(int v = 0; v < 12*3; v++) {
    g_transform_buffer_cube[3*v+0] = 0.0f;
    g_transform_buffer_cube[3*v+1] = 0.0f;
    g_transform_buffer_cube[3*v+2] = 0.0f;
}

GLuint vertexbuffercube;
glGenBuffers(1, &vertexbuffercube);
glBindBuffer(GL_ARRAY_BUFFER, vertexbuffercube);
glBufferData(GL_ARRAY_BUFFER, sizeof(g_vertex_buffer_data_cube), g_vertex_buffer_data_cube, GL_STATIC_DRAW);

GLuint uvbuffercube;
glGenBuffers(1, &uvbuffercube);
glBindBuffer(GL_ARRAY_BUFFER, uvbuffercube);
glBufferData(GL_ARRAY_BUFFER, sizeof(g_uv_buffer_data_cube), g_uv_buffer_data_cube, GL_STATIC_DRAW);

GLuint transformbuffercube;
glGenBuffers(1, &transformbuffercube);
glBindBuffer(GL_ARRAY_BUFFER, transformbuffercube);
glBufferData(GL_ARRAY_BUFFER, sizeof(g_transform_buffer_cube), g_transform_buffer_cube, GL_STATIC_DRAW);

do{
    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );


    glUseProgram(programID);

    computeMatricesFromInputs();
    mat4 ProjectionMatrix = getProjectionMatrix();
    mat4 ViewMatrix = getViewMatrix();
    mat4 ModelMatrix = mat4(1.0);
    mat4 MVP = ProjectionMatrix * ViewMatrix * ModelMatrix;

    glUniformMatrix4fv(CubeMatrixID, 1, GL_FALSE, &MVP[0][0]);

    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_2D, Texture);
    glUniform1i(TextureID, 0);

    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, vertexbuffercube);
    glVertexAttribPointer(
        0,
        3,
        GL_FLOAT,
        GL_FALSE,
        0,
        (void*)0
        );

    glEnableVertexAttribArray(1);
    glBindBuffer(GL_ARRAY_BUFFER, uvbuffercube);
    glVertexAttribPointer(
        1,
        2,
        GL_FLOAT,
        GL_FALSE,
        0,
        (void*)0
        );

    glEnableVertexAttribArray(2);
    glBindBuffer(GL_ARRAY_BUFFER, transformbuffercube);
    glVertexAttribPointer(
        2,
        3,
        GL_FLOAT,
        GL_FALSE,
        0,
        (void*)0
        );


    glDrawArrays(GL_TRIANGLES, 0, 12*3);

    glDisableVertexAttribArray(0);
    glDisableVertexAttribArray(1);
    glDisableVertexAttribArray(2);

    glfwSwapBuffers(window);
    glfwPollEvents();

}
while( glfwGetKey(window, GLFW_KEY_ESCAPE ) != GLFW_PRESS &&
   glfwWindowShouldClose(window) == 0 );


glDeleteBuffers(1, &vertexbuffercube);
glDeleteBuffers(1, &uvbuffercube);
glDeleteBuffers(1, &transformbuffercube);
glDeleteProgram(programID);
glDeleteTextures(1, &Texture);
glDeleteVertexArrays(1, &VertexArrayID);


glfwTerminate();

return 0;
}
