

//OLMOS RESENDIZ JOSE ARMANDO

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

public class RegistroPersonas extends JFrame {

    private JTable table;
    private DefaultTableModel model;
    private JButton btnAgregar, btnEditar, btnEliminar;
    private JTextField txtNombre, txtEdad;
    private List<String> personasData;

    public RegistroPersonas() {
        setTitle("Registro de Personas");
        setSize(550, 400);
        setDefaultCloseOperation(3);

        personasData = new ArrayList<String>();
        cargarDatosDesdeArchivo();

// Crear la tabla
        String[] columnNames = {"Nombre", "Edad"};
        model = new DefaultTableModel(columnNames, 0);
        table = new JTable(model);
        cargarDatosEnTabla();
        JScrollPane scrollPane = new JScrollPane(table);
        add(scrollPane, BorderLayout.CENTER);

        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout());
        add(panel, BorderLayout.SOUTH);

        txtNombre = new JTextField(10);
        txtEdad = new JTextField(5);

        panel.add(new JLabel("Nombre:"));
        panel.add(txtNombre);
        panel.add(new JLabel("Edad:"));
        panel.add(txtEdad);

        btnAgregar = new JButton("Agregar");
        btnEditar = new JButton("Editar");
        btnEliminar = new JButton("Eliminar");

        panel.add(btnAgregar);
        panel.add(btnEditar);
        panel.add(btnEliminar);

        btnAgregar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                agregarPersona();
            }

            private void agregarPersona() {
                String nombre = txtNombre.getText();
                String edad = txtEdad.getText();
                if (!nombre.isEmpty() && !edad.isEmpty()) {
                    String persona = nombre + "," + edad;
                    personasData.add(persona);
                    cargarDatosEnTabla();
                    guardarDatosEnArchivo();
                    txtNombre.setText("");
                    txtEdad.setText("");
                }
            }
        });

        btnEditar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                editarPersona();
            }

            private void editarPersona() {
                int filaSeleccionada = table.getSelectedRow();
                if (filaSeleccionada != -1) {
                    String nombre = txtNombre.getText();
                    String edad = txtEdad.getText();
                    if (!nombre.isEmpty() && !edad.isEmpty()) {
                        String personaEditada = nombre + "," + edad;
                        personasData.set(filaSeleccionada, personaEditada);
                        cargarDatosEnTabla();
                        guardarDatosEnArchivo();
                        txtNombre.setText("");
                        txtEdad.setText("");
                    }
                }
            }
        });

        btnEliminar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                eliminarPersona();
            }

            private void eliminarPersona() {
                int filaSeleccionada = table.getSelectedRow();
                if (filaSeleccionada != -1) {
                    personasData.remove(filaSeleccionada);
                    cargarDatosEnTabla();
                    guardarDatosEnArchivo();

                }
            }
        }
        );
    }

    private void cargarDatosDesdeArchivo() {
        File file = new File("personas.txt");
        if (file.exists()) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = br.readLine()) != null) {
                    personasData.add(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void guardarDatosEnArchivo() {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("personas.txt"))) {
            for (String persona : personasData) {
                bw.write(persona);
                bw.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void cargarDatosEnTabla() {
        model.setRowCount(0);
        for (String persona : personasData) {
            String[] datos = persona.split(",");
        model.addRow(datos);
        }
    }
   
    public static void main(String[] args) {
        new RegistroPersonas().setVisible(true);
    }
}