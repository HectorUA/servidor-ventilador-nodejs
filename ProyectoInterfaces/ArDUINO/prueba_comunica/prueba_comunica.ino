void setup() {
Serial.begin(9600);
Serial.print("inicializando comunicacion");
}

void loop() {
  // put your main code here, to run repeatedly:

  while(Serial.available()>0)
{
  Serial.println(Serial.readString()+"un gato montez");
}
delay(500);
}
