package uniandes.academia.ui.handler;

import java.io.File;
import java.io.IOException;

import javax.inject.Inject;

import org.eclipse.core.commands.AbstractHandler;
import org.eclipse.core.commands.ExecutionEvent;
import org.eclipse.core.commands.ExecutionException;
import org.eclipse.core.commands.IHandler;
import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.ISelectionService;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.handlers.HandlerUtil;
import org.eclipse.xtext.generator.IGenerator;
import org.eclipse.xtext.resource.IResourceDescriptions;
import org.eclipse.xtext.resource.XtextResourceSet;
import org.eclipse.xtext.ui.resource.IResourceSetProvider;

import com.google.inject.Guice;
import com.google.inject.Injector;

import uniandes.academia.GeneratorRuntimeModule;

public class GenerationHandler extends AbstractHandler implements IHandler {

	@Inject
	private IGenerator generator;

	@Inject
	IResourceDescriptions resourceDescriptions;

	@Inject
	IResourceSetProvider resourceSetProvider;
	
	private Injector injector;

	@Override
    public Object execute(ExecutionEvent event) throws ExecutionException {
		
		IWorkbenchWindow window = HandlerUtil.getActiveWorkbenchWindowChecked(event);
		
		// set selection service
		ISelectionService service = window.getSelectionService();
		// set structured selection
		IStructuredSelection structured = (IStructuredSelection) service.getSelection();
	 
		//check if it is an IFile
		if (structured.getFirstElement() instanceof IFile) {
			// get the selected file
			IFile file = (IFile) structured.getFirstElement();
			// get the path
			IPath path = file.getLocation();
			System.out.println(path.toPortableString());
			
			URI modelURI = URI.createPlatformResourceURI(file.getFullPath().toString(), true);
			IProject project = file.getProject();

			System.out.println("@ SERIALIZATION HANDLER 2");

			// create an output folder for the serialized uml-model
			IFolder srcGenFolder = project.getFolder("model");
			if (!srcGenFolder.exists()) {
				try {
					System.out.println("Not exist model");
					srcGenFolder.create(true, true, new NullProgressMonitor());
				} catch (CoreException e) {
					e.printStackTrace();
					return null;
				}

			}

			try {
				// run the serializiation
				System.out.println("Exist model");
				serializeXtext(modelURI, project);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		MessageDialog.openInformation(
				window.getShell(),
				"xText To XMI",
				"XMI created, Don't forget to configure path for this XMI in MTC-FLOW configuration modelPath");
		return null;
		
		
   
    }
	
	
	/**
	 * Serialization of the parsed DSL-Model which is represented in an .cdalf
	 * file
	 * 
	 * @param modelURI
	 * @param target
	 * @throws IOException
	 */
	protected void serializeXtext(URI modelURI, IContainer target) throws IOException {
		
		try {
		String xtextExtention = modelURI.fileExtension();
		System.out.println("Extension:"+xtextExtention+"-Path:"+modelURI.path());
		File modelName = new File(modelURI.path());
		
		String fullUMLModelName = modelName.getName().substring(0,
				modelName.getName().length() - xtextExtention.length() - 1)
				+ ".xmi";
		
		System.out.println(fullUMLModelName);

		//Reemplazar
		 injector = Guice.createInjector(new GeneratorRuntimeModule());
		
		// injector =new LineChartDslStandaloneSetup().createInjectorAndDoEMFRegistration();
		 
		System.out.println("Injector created");
		// load the xtext model to an xtextresourceset
		XtextResourceSet resourceSet = injector.getInstance(XtextResourceSet.class);
		Resource xtextResource = resourceSet.getResource(modelURI, true);

		EcoreUtil.resolveAll(xtextResource);

		// store in a xmi-resoure
		System.out.println(target.getFullPath() + "/" + fullUMLModelName);
		Resource xmiResource = resourceSet.createResource(URI.createURI(target.getFullPath() + "/" + fullUMLModelName));
		xmiResource.getContents().add(xtextResource.getContents().get(0));
		
			xmiResource.save(null);
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
