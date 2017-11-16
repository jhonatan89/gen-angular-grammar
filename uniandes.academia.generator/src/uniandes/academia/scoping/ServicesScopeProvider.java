package uniandes.academia.scoping;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.xtext.EcoreUtil2;
import org.eclipse.xtext.scoping.IScope;
import org.eclipse.xtext.scoping.IScopeProvider;
import org.eclipse.xtext.scoping.Scopes;
import org.eclipse.xtext.scoping.impl.AbstractDeclarativeScopeProvider;

import uniandes.academia.generator.GeneratorPackage;
import uniandes.academia.generator.Service;

public class ServicesScopeProvider implements IScopeProvider {

	@Inject
	@Named(AbstractDeclarativeScopeProvider.NAMED_DELEGATE)
	private IScopeProvider delegate;

	@Override
	public IScope getScope(EObject context, EReference reference) {

		if (reference == GeneratorPackage.Literals.CRUD__CREATE 	|| 
			reference == GeneratorPackage.Literals.CRUD__LIST  		||
			reference == GeneratorPackage.Literals.CRUD__GET  		||
			reference == GeneratorPackage.Literals.CRUD__LIST_NUM  	||
			reference == GeneratorPackage.Literals.CRUD__UPDATE  	||
			reference == GeneratorPackage.Literals.CRUD__DELETE_ITEM){
			Service model = EcoreUtil2.getContainerOfType(context,
					Service.class);
			return getCrudCreateScope(model);
		}

		return delegate.getScope(context, reference);
	}

	private IScope getCrudCreateScope(Service model) {
		if (model == null) {
			return IScope.NULLSCOPE;
		}
		List<Service> allService = EcoreUtil2.getAllContentsOfType(model,
				Service.class);
		return Scopes.scopeFor(allService);
	}

}
