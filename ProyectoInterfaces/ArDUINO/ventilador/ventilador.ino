//Guarda el numero de pines de arduinos conectados 
const int pinENA = 5;
const int pinIN1 = 6;
const int pinIN2 = 7;
const int pinIN3 = 9;
const int pinIN4 = 10;
const int pinENB = 11;
int DatRecibido =0;
long temp =random(15,30);

const int waitTime = 2000;  //espera entre fases
const int speed = 200;    //velocidad de giro

const int pinMotorA[3] = { pinENA, pinIN2, pinIN1}; //motor derecha
const int pinMotorB[3] = { pinENB, pinIN3, pinIN4 }; //motor izquierda

void setup()
{
    Serial.begin(9600); 

  pinMode(pinIN1, OUTPUT);
  pinMode(pinIN2, OUTPUT);
  pinMode(pinENA, OUTPUT);
  pinMode(pinIN3, OUTPUT);
  pinMode(pinIN4, OUTPUT);
  pinMode(pinENB, OUTPUT);
}

void loop()
{
  DatRecibido= Serial.readString().toInt();
  if(  DatRecibido==1)
{
  moveBackward(pinMotorA, 500); // FUNCION ADELANTE
  //Serial.println("Prendido");
   delay(2000);

}
else
{
  fullStop(pinMotorA);
delay(2000);
}
temp =random(50);
   Serial.println(temp);
  
}

void moveForward(const int pinMotor[3], int speed)  // FUNCION ADELANTE (pines DE MOTOR,  velocidad)
{
  digitalWrite(pinMotor[1], LOW);
  digitalWrite(pinMotor[2], HIGH);

  analogWrite(pinMotor[0], speed);
}

void moveBackward(const int pinMotor[3], int speed) //FUNCION ATRAS (pines DE MOTOR,  velocidad)
{
  digitalWrite(pinMotor[1], HIGH);
  digitalWrite(pinMotor[2], LOW);

  analogWrite(pinMotor[0], speed);
}

void fullStop(const int pinMotor[3])  //FUNCION stop (pines DE MOTOR)
{
  digitalWrite(pinMotor[1], LOW);
  digitalWrite(pinMotor[2], LOW);

  analogWrite(pinMotor[0], 0);
}
