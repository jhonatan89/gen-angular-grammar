/*
 * generated by Xtext
 */
package uniandes.academia.validation

import org.eclipse.emf.common.util.URI
import org.eclipse.xtext.validation.EValidatorRegistrar
import uniandes.academia.generator.GeneratorPackage
import org.eclipse.ocl.xtext.completeocl.validation.CompleteOCLEObjectValidator
import org.eclipse.ocl.pivot.utilities.OCL
import org.eclipse.emf.ecore.resource.Resource
import org.eclipse.emf.ecore.EPackage

//import org.eclipse.ocl.examples.xtext.completeocl.validation.CompleteOCLEObjectValidator

//import org.eclipse.xtext.validation.Check
/**
 * Custom validation rules. 
 *
 * see http://www.eclipse.org/Xtext/documentation.html#validation
 */
class GeneratorValidator extends AbstractGeneratorValidator {
	
	
	//  public static val INVALID_NAME = 'invalidName'
	//
	//	@Check
	//	def checkGreetingStartsWithCapital(Greeting greeting) {
	//		if (!Character.isUpperCase(greeting.name.charAt(0))) {
	//			warning('Name should start with a capital', 
	//					MyDslPackage.Literals.GREETING__NAME,
	//					INVALID_NAME)
	//		}
	//	}
	
	
	
	override register(EValidatorRegistrar registrar) {
		super.register(registrar);
		val OCL ocl = OCL.newInstance();
		val ePackage = GeneratorPackage.eINSTANCE;
		val oclURI = URI.createPlatformResourceURI(
			"/uniandes.academia.generator/ocl/VALIDATION.ocl",
			true
		);
		registrar.register(
			ePackage,
			new CompleteOCLEObjectValidator(ePackage,oclURI,ocl.environmentFactory)
		);
	}

}
