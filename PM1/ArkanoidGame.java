

//OLMOS RESENDIZ JOSE ARMANDO 

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import javax.swing.Timer;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class ArkanoidGame extends JPanel implements MouseMotionListener, ActionListener{
    Timer timer;
    int ballX = 250;
    int ballY = 250;
    int ballWidth = 10;
    int ballHeight = 10;
    int ballVelX = 2;
    int ballVelY = 2;
    int paddleX = 200;
    int paddleY = 550;
    int paddleWidth = 100;
    int paddleHeight = 20;
    boolean inRunnig = true;
    boolean isGameOver = false;

    Rectangle [][] blocks;
    int blockWidth = 60;
    int blockHeight = 20;
    int rows = 4, cols = 6;
   
    public ArkanoidGame() {
        setBackground(Color.BLACK);
        addMouseMotionListener(this);
       
        blocks = new Rectangle[rows][cols];
        for(int i = 0; i< rows; i++){
            for(int j = 0; j< cols; j++){
                blocks[i][j] = new Rectangle(j*(blockWidth+10)+30, i *(blockHeight+5)+30, blockWidth,blockHeight);
            }
        }
        timer = new Timer(5, this); //ActionListener
        timer.start();
    }

    @Override
    public void mouseDragged(MouseEvent e) {
   
    }

    @Override
    public void mouseMoved(MouseEvent e) {
        paddleX = e.getX() - paddleWidth / 2;
        if(paddleX < 0) paddleX = 0;
        if(paddleX > getWidth() - paddleWidth)paddleX = getWidth() - paddleWidth;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
            if(isGameOver) {
                return;
            }
            //movimiento bolita
            ballX += ballVelX;
            ballY += ballVelY;
            
            //choque paredes
            if(ballX <= 0 || ballX >= getWidth() - 10) {
                ballVelX =- ballVelX;
            }
            //choque arriba
            if(ballY <= 0) {
                ballVelY =- ballVelY;
            }
           
            //choque jugador
            Rectangle ballRect = new Rectangle(ballX, ballY, 10, 10); // Rectángulo de la bolita
            Rectangle paddleRect = new Rectangle(paddleX, paddleY, paddleWidth, paddleHeight); // Rectángulo de la paleta
            
            if (ballRect.intersects(paddleRect)) {
                ballVelY =-ballVelY; // Invertir la dirección en el eje Y
                ballY = paddleY - 10; // Colocar la bolita justo encima
            }
           
            //cae abajo
            if(ballY >= getHeight()) {
                isGameOver = true;
            }
           
            //choque bloques
            for(int i = 0; i < rows; i++){
                for(int j = 0; j < cols; j++){            
                    if(blocks[i][j] != null && blocks[i][j].intersects(new Rectangle(ballX, ballY,10,10))){
                        ballVelY =-ballVelY;                    
                    blocks[i][j] = null;
                    }
                }                    
            }
            repaint();
    }
   
    @Override
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        //bolita
        g.setColor(Color.red);
        g.fillOval(ballX, ballY,ballWidth,ballHeight);
        //barrajugador
        g.setColor(Color.blue);
        g.fillRect(paddleX,paddleY, paddleWidth, paddleHeight);
       
        //bloques
        g.setColor(Color.green);
           for(int i = 0; i < rows; i++){
                for(int j = 0; j < cols; j++){
                    if(blocks[i][j] != null){
                        g.fillRect(blocks[i][j].x,blocks[i][j].y, blockWidth, blockHeight);
                    }
                }            
           }
           
          //MensajeGameOver
          if(isGameOver) {
              g.setColor(Color.WHITE);
              g.setFont(new Font("Arial", Font.BOLD, 30));
              g.drawString("Game Over", getWidth() / 2 - 100, getHeight() / 2);
          }
    }
   
    public static void main(String[] args) {
        JFrame frame = new JFrame("Arkanoid Game");        
        ArkanoidGame ag = new ArkanoidGame();
        frame.add(ag);
        frame.setSize(500,600);
        frame.setDefaultCloseOperation(3);
        frame.setVisible(true);        
    }
}