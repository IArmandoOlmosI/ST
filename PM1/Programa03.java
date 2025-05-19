

//OLMOS RESENDIZ JOSE ARMANDO

import java.awt.BorderLayout;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class Programa03 extends JFrame{
	PanelBolita bolita;
	JLabel coordenadas, ganaste;
	
	public Programa03() {
		setTitle("Bolita 1");
		setSize(400, 400);
		setDefaultCloseOperation(3);
		
		coordenadas = new JLabel("X = 180, Y = 180");
		ganaste = new JLabel("No ganaste");
		bolita = new PanelBolita(coordenadas, ganaste);
		
		add(coordenadas,BorderLayout.NORTH);
		add(bolita,BorderLayout.CENTER);
		add(ganaste,BorderLayout.SOUTH);
	}
	
	public static void main(String[] args) {
		Programa03 p = new Programa03();
		p.setVisible(true);
	}

}
