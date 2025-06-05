
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, Shield, Wrench } from "lucide-react";

const QCCerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Material Certificates</h2>
          <p className="text-gray-600">Steel, strand, mesh, cement, and fly ash certifications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Upload Certificate
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search certificates..."
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="steel-certs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="steel-certs">Steel</TabsTrigger>
          <TabsTrigger value="strand-certs">Strand</TabsTrigger>
          <TabsTrigger value="mesh-certs">Mesh</TabsTrigger>
          <TabsTrigger value="cement-certs">Cement</TabsTrigger>
          <TabsTrigger value="flyash-certs">Fly Ash</TabsTrigger>
        </TabsList>

        <TabsContent value="steel-certs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Steel Certificates
              </CardTitle>
              <CardDescription>Flat stock, angle, tube, rebar certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Steel certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strand-certs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Strand Certificates
              </CardTitle>
              <CardDescription>Prestressing strand certifications and test reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Strand certificate tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mesh-certs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Mesh Certificates
              </CardTitle>
              <CardDescription>Type 1, Type 2, Type 3, Type 4 mesh certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Mesh certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cement-certs">
          <Card>
            <CardHeader>
              <CardTitle>Cement Certificates</CardTitle>
              <CardDescription>Portland cement certifications and mill test reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Cement certificate tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flyash-certs">
          <Card>
            <CardHeader>
              <CardTitle>Fly Ash Certificates</CardTitle>
              <CardDescription>Fly ash certifications and quality reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Fly ash certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCCerts;
