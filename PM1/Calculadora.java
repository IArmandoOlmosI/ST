

//OLMOS RESENDIZ JOSE ARMANDO

import java.awt.ComponentOrientation;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JTextField;

public class Calculadora extends JFrame implements ActionListener{

	JTextField pantalla;
    JButton botones[];
    String op1,op2;
    boolean vsuma, vresta, vdivision, vmultiplicacion, vpunto = true;
    
    public Calculadora() {
        setSize(400, 550);
        setTitle("Casio");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(null);
        Font f = new Font("Arial", Font.BOLD, 70);
       
        pantalla = new JTextField();
        pantalla.setBounds(3, 20, 380, 80);
        pantalla.disable();
        pantalla.setFont(f);
        pantalla.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
        add(pantalla);
       
        int x = 1, y = 420;
        botones = new JButton[16];
        
        botones[0] = new JButton("0");
        botones[0].setBounds(x, y, 80, 80);
        botones[0].setFont(f);
        botones[0].addActionListener(this);
        add(botones[0]);
        
        y = 320; 
        int contColumnas = 1;
        
        for(int i = 1; i < 10; i++) {
            botones[i] = new JButton(i + "");
            botones[i].setBounds(x, y, 80, 80);
            botones[i].addActionListener(this);
            botones[i].setFont(f);
            add(botones[i]);
            x += 100;
            
            if(contColumnas == 3) {
                y -= 100;
                x = 1;
                contColumnas = 0;
            }            
            contColumnas += 1;
        }
        
        botones[10] = new JButton("+");
        botones[10].setFont(f);
        botones[10].setBounds(301, 120, 80, 80);
        botones[10].addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				op1 = pantalla.getText();
				pantalla.setText("");
				vsuma = true;
				vpunto = true;
			}
		});
        add(botones[10]);
        
        botones[11] = new JButton("=");
        botones[11].setFont(f);
        botones[11].setBounds(201, 420, 80, 80);
        botones[11].addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				op2 = pantalla.getText();
				if (vsuma) {
					double resultado = Double.parseDouble(op1) + Double.parseDouble(op2);
					pantalla.setText(resultado + "");
					vsuma = false;
				}
				if (vresta) {
					double resultado = Double.parseDouble(op1) - Double.parseDouble(op2);
					pantalla.setText(resultado + "");
					vresta = false;
				}
				if(vmultiplicacion) {
					double resultado = Double.parseDouble(op1) * Double.parseDouble(op2);
					pantalla.setText(resultado + "");
					vmultiplicacion = false;
				}
				if(vdivision) {
					double resultado = Double.parseDouble(op1) / Double.parseDouble(op2);
					pantalla.setText(resultado + "");
					vdivision = false;
				}
			}
		});
        add(botones[11]);
        
        botones[12] = new JButton(".");
        botones[12].setFont(f);
        botones[12].setBounds(101, 420, 80, 80);
        botones[12].addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				if (vpunto) {
					pantalla.setText(pantalla.getText() + ".");
					vpunto = false;
				}
			}
		});
        add(botones[12]);
        
        botones[13] = new JButton("-");
        botones[13].setFont(f);
        botones[13].setBounds(301, 220, 80, 80);
        botones[13].addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				op1 = pantalla.getText();
				pantalla.setText("");
				vresta = true;
				vpunto = true;
			}
		});
        add(botones[13]);
        
        botones[14] = new JButton("x");
        botones[14].setFont(f);
        botones[14].setBounds(301, 320, 80, 80);
        botones[14].addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				op1 = pantalla.getText();
				pantalla.setText("");
				vmultiplicacion = true;
				vpunto = true;
			}
		});
        add(botones[14]);
        
        botones[15] = new JButton("/");
        botones[15].setFont(f);
        botones[15].setBounds(301, 420, 80, 80);
        botones[15].addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				op1 = pantalla.getText();
				pantalla.setText("");
				vdivision = true;
				vpunto = true;
			}
		});
        add(botones[15]);
    }
	
	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		JButton botonpresionado = (JButton)e.getSource();
        pantalla.setText(pantalla.getText() + botonpresionado.getText());
	}
	
	public static void main(String[] args) {
        Calculadora c = new Calculadora();
        c.setVisible(true);
    }

}
