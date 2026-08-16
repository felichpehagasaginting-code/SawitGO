allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}
subprojects {
    project.evaluationDependsOn(":app")
    
    val configureSubproject = {
        val extension = extensions.findByName("android")
        if (extension != null) {
            try {
                // Enforce latest SDK 36 on all subproject plugins
                val setCompileSdkMethod = extension.javaClass.methods.firstOrNull { 
                    it.name == "setCompileSdkVersion" && it.parameterTypes.size == 1 && it.parameterTypes[0] == Int::class.javaPrimitiveType 
                }
                setCompileSdkMethod?.invoke(extension, 36)

                val setBuildToolsMethod = extension.javaClass.methods.firstOrNull { 
                    it.name == "setBuildToolsVersion" && it.parameterTypes.size == 1 && it.parameterTypes[0] == String::class.java 
                }
                setBuildToolsMethod?.invoke(extension, "36.0.0")

                // Inject namespace if missing
                val getNamespaceMethod = extension.javaClass.methods.firstOrNull { it.name == "getNamespace" }
                val currentNamespace = getNamespaceMethod?.invoke(extension) as? String
                if (currentNamespace.isNullOrEmpty()) {
                    val setNamespaceMethod = extension.javaClass.methods.firstOrNull { 
                        it.name == "setNamespace" && it.parameterTypes.size == 1 && it.parameterTypes[0] == String::class.java 
                    }
                    val fallbackNamespace = "id.ac.cwe.sawitgo." + project.name.replace('-', '_')
                    setNamespaceMethod?.invoke(extension, fallbackNamespace)
                }
            } catch (_: Exception) {}
        }
    }

    if (state.executed) {
        configureSubproject()
    } else {
        afterEvaluate {
            configureSubproject()
        }
    }
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
