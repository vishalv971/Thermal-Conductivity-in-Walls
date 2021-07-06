#include "max6675.h"

int ktcSO = 12;
int ktcCS = 10;
int ktcCLK = 13;

MAX6675 ktc(ktcCLK, ktcCS, ktcSO);

  
void setup() {
  Serial.begin(9600);
  delay(500);
     
}

void loop() {
  // basic readout test
  //delay(1000);
  while(Serial.available()) {
    int incomingByte = Serial.read();
    Serial.println(ktc.readCelsius()); 
  }
}

