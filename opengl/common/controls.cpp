#include <GLFW/glfw3.h>
extern GLFWwindow* window;

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
using namespace glm;

#include "controls.hpp";


mat4 ProjectionMatrix;
mat4 ViewMatrix;

mat4 getProjectionMatrix() {
    return ProjectionMatrix;
}

mat4 getViewMatrix() {
    return ViewMatrix;
}

vec3 position = vec3( 0, 0, 5 );

float horizontalAngle = 3.14f;
float verticalAngle = 0.0f;
float initialFoV = 45.0f;

float speed = .03f;
float mouseSpeed = 0.0000005f;



void computeMatricesFromInputs() {

    static double lastTime = glfwGetTime();

    double currentTime = glfwGetTime();
    float deltaTime = (currentTime - lastTime);

    double xpos, ypos;
    int innerWidth, innerHeight;
    glfwGetCursorPos(window, &xpos, &ypos);
    glfwGetWindowSize(window, &innerWidth, &innerHeight);
    // glfwSetCursorPos(window, innerWidth/2, innerHeight/2);

    // horizontalAngle += mouseSpeed * deltaTime * float(innerWidth/2 - xpos);
    // verticalAngle   += mouseSpeed * deltaTime * float(innerHeight/2 - ypos);

    vec3 direction = vec3(
        cos(verticalAngle) * sin(horizontalAngle),
        sin(verticalAngle),
        cos(verticalAngle) * cos(horizontalAngle)
        );

    vec3 right = vec3(
        sin(horizontalAngle - 3.14f/2.0f),
        0,
        cos(horizontalAngle  - 3.14f/2.0f)
        );

    vec3 up = cross( right, direction );

    if (glfwGetKey( window, GLFW_KEY_UP ) == GLFW_PRESS)
    {
        position += direction * deltaTime * speed;
    }

    if (glfwGetKey( window, GLFW_KEY_DOWN ) == GLFW_PRESS)
    {
        position -= direction * deltaTime * speed;
    }

    if (glfwGetKey( window, GLFW_KEY_RIGHT ) == GLFW_PRESS)
    {
        position -= right * deltaTime * speed;
    }

    if (glfwGetKey( window, GLFW_KEY_LEFT ) == GLFW_PRESS)
    {
        position += right * deltaTime * speed;
    }

    ProjectionMatrix = perspective(initialFoV, 720.0f / 450.0f, 0.1f, 100.0f);

    ViewMatrix = lookAt(
        position,
        position+direction,
        up
    );

}

// mat4 CubeProjection = perspective(radians(45.0f), 1440.0f / 900.0f, 0.1f, 100.0f);
// mat4 CubeView = lookAt(
//     vec3(4,3,10),
//     vec3(0,0,0),
//     vec3(0,1,0)
//     );
// mat4 CubeModel = mat4(1.0f);
// mat4 CubeMVP = CubeProjection * CubeView * CubeModel;
