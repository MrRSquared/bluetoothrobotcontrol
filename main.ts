bluetooth.onUartDataReceived(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)), function () {
    incoming = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    serial.writeLine(incoming)
    Rover.setReceiveString(incoming)
    // Move moves the motors
    // Move moves the motors
    if (Rover.checkOrder(Orders.MOVE)) {
        Rover.MotorRunDual(Rover.getParameter(0), Rover.getParameter(1))
    } else if (Rover.checkOrder(Orders.ORDER_RGB)) {
        Rover.setRGBLED(Rover.getParameter(0), Rover.rgb(Rover.getParameter(1), Rover.getParameter(2), Rover.getParameter(3)))
    } else if (Rover.checkOrder(Orders.BUZZER)) {
        if (mode < 4) {
            mode = mode + 1
        } else {
            mode = 0
            serial.writeLine("" + (mode))
        }
    }
})
bluetooth.onBluetoothConnected(function () {
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showString("D")
})
let mode = 0
let incoming = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Heart)
