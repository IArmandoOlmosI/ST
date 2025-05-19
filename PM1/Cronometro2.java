

//OLMOS RESENDIZ JOSE ARMANDO

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class Cronometro2 implements ActionListener{
	JLabel etiquetaContador;
	JButton btnReiniciar, btnIniciar;
	int contador;
	boolean btnActivo;
	HiloContador hc;

	public Cronometro2() {
		JFrame ventana = new JFrame();
		ventana.setSize(300, 300);
		ventana.setTitle("Cronometro");
		JPanel p = new JPanel(new GridLayout(3, 1));
		etiquetaContador = new JLabel("0");
		btnIniciar = new JButton("Iniciar");
		btnIniciar.addActionListener(this);
		btnReiniciar = new JButton("Reiniciar");
		btnReiniciar.addActionListener(this);
		p.add(etiquetaContador);
		p.add(btnIniciar);
		p.add(btnReiniciar);
		ventana.add(p);
		ventana.setVisible(true);
		ventana.setDefaultCloseOperation(3);

	}

	public static void main(String[] args) {
		Cronometro2 c = new Cronometro2();
	}

	@Override
	public void actionPerformed(ActionEvent arg0) {
		// TODO Auto-generated method stub
		if (arg0.getSource().equals(btnIniciar)) {
			btnActivo = true;
			hc = new HiloContador();
			hc.start();
		}

		if (arg0.getSource().equals(btnReiniciar)) {
			btnActivo = false;
			contador = 0;
			etiquetaContador.setText(contador + "");
		}

	}

	private class HiloContador extends Thread {
		public HiloContador() {
		}

		public void run() {
			try {
				while (btnActivo) {
					contador++;
					etiquetaContador.setText(contador + "");
					Thread.sleep(500);
				}
			} catch (Exception e) {
			}
		}
	}
}