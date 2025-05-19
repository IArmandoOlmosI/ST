

//OLMOS RESENDIZ JOSE ARMANDO

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Galeria extends JFrame implements ActionListener{
	PanelImagen pi;
	JPanel pbotones;
	JButton btnAtras, btnAdelante;
	String nuevaImagen;
	int contador = 1;
	
	public Galeria() {
		setTitle("Galeria Imagenes");
		setSize(400, 400);
		setDefaultCloseOperation(3);
		
		nuevaImagen = "gato" + contador + ".jpg";
		pi = new PanelImagen();
		pi.ruta = nuevaImagen;
		pi.setSize(400, 350);
		
		pbotones = new JPanel();
		btnAtras = new JButton("Atras");
		btnAdelante = new JButton("Adelante");
		btnAtras.addActionListener(this);
		btnAdelante.addActionListener(this);
		pbotones.add(btnAtras);
		pbotones.add(btnAdelante);
		
		add(pi);
		add(pbotones, BorderLayout.SOUTH);
	}
	
	
	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource().equals(btnAtras)) {
			if(contador <= 1) {
				contador = 3;
			} else {
				contador -= 1;
			}
		}
		
		if(e.getSource().equals(btnAdelante)) {
			if(contador >= 3) {
				contador = 1;
			} else {
				contador += 1;
			}
		}
		
		System.out.println("Contador" + contador);
		nuevaImagen = "gato" + contador + ".jpg";
		pi.ruta = nuevaImagen;
		pi.repaint();
	}	
}