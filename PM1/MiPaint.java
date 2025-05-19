

//OLMOS RESENDIZ JOSE ARMANDO

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.util.ArrayList;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class MiPaint extends JFrame implements ActionListener{
	JComboBox<String> comboColores;
	JButton btnLimpiar;
	DibujoPanel panelDibujo;
	Color colorSeleccionado = Color.BLACK;
	
	public MiPaint() {
		setTitle("Mi paint");
		setSize(300,300);
		setDefaultCloseOperation(3);
		String[] colores = {"Negro","Rojo","Azul","Amarillo"};
		comboColores = new JComboBox<>(colores);
		comboColores.addActionListener(this);
		btnLimpiar = new JButton("Borrar");
		btnLimpiar.addActionListener(this);
		JPanel panelOpciones = new JPanel();
		panelOpciones.add(comboColores);
		panelOpciones.add(btnLimpiar);
		panelDibujo = new DibujoPanel();
		add(panelOpciones,BorderLayout.NORTH);
		add(panelDibujo,BorderLayout.CENTER);
	}
	
	class DibujoPanel extends JPanel implements MouseMotionListener {
		ArrayList<Point> puntos = new ArrayList<>();
		
		public DibujoPanel() {
			setBackground(Color.WHITE);
			addMouseMotionListener(this);
		}

		@Override
		protected void paintComponent(Graphics g) {
			// TODO Auto-generated method stub
			super.paintComponent(g);
			g.setColor(colorSeleccionado);
			for(Point punto:puntos) {
				g.fillOval(punto.x, punto.y, 5, 5);
			}
		}
		
		public void limpiar() {
			puntos.clear();
			repaint();
		}

		@Override
		public void mouseDragged(MouseEvent e) {
			// TODO Auto-generated method stub
			puntos.add(e.getPoint());
			repaint();
		}

		@Override
		public void mouseMoved(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}
	}
	
	public static void main(String[] args) {
		MiPaint mp = new MiPaint();
		mp.setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource().equals(btnLimpiar)) {
			panelDibujo.limpiar();
		}
		
		if(e.getSource().equals(comboColores)) {
			String comboColoresTexto = (String)comboColores.getSelectedItem();
			switch(comboColoresTexto) {
			case "Rojo":
				colorSeleccionado = Color.RED;
				break;
			case "Azul":
				colorSeleccionado = Color.BLUE;
				break;
			case "Amarillo":
				colorSeleccionado = Color.YELLOW;
				break;
			default:
				colorSeleccionado = Color.BLACK;
			}
		}
	}
}
