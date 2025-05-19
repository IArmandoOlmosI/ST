

//OLMOS RESENDIZ JOSE ARMANDO

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class PanelBolita extends JPanel implements MouseMotionListener, MouseListener{
	int x = 180;
	int y = 180;
	JLabel coordenadas, ganaste;
	boolean arrastrando = true;
	
	public PanelBolita(JLabel coordenadas, JLabel ganaste) {
		this.coordenadas = coordenadas;
		this.ganaste = ganaste;
		addMouseMotionListener(this);
		addMouseListener(this);
	}
	
	@Override
	protected void paintComponent(Graphics g) {
		// TODO Auto-generated method stub
		super.paintComponent(g);
		
		if(arrastrando) {
			g.setColor(Color.RED);
		}else {
			g.setColor(Color.GREEN);
		}
		
		g.fillOval(x, y, 20, 20);
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		// TODO Auto-generated method stub
		x = e.getX();
		y = e.getY();
		coordenadas.setText("X = " + x + "Y = " + y);
		
		if (x == 100 && y == 100) {
			ganaste.setText("Ganaste!!!");
		}else {
			ganaste.setText("No ganaste");
		}
		repaint();
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub
		arrastrando = true;
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

}
