Dane:
Xaktualna;
numer_sekcji;
max_X_dla sekcji;
YdlaXaktualne;
//oś X idzoe og góry
Xmax section4endX;
Xmin section9endX;

etap :	0  //x od punktu początkowego do Xmax
		1  //x od Xmax do Xmin
		2  //x od Xmin do punktu początkowego



if (etap==0)
{
	
}
else if (etap==1)
{
	
}
else
{	//etap2
	
}

function incrementX_etap0()
{
	Xaktualna++;
	if (Xaktualna==Xmax)
	{
		etap++;
		numer_sekcji++; //powinna byc sekcja 5
		przeladuj wspólrzędne sekcji;
		pobierz X początkowego Xstart do Xaktualna;
		oblicz YdlaXaktualne dla Xaktualna;	
		return YdlaXaktualne;
	}
	if (Xaktualna==max_X_dla sekcji)
	{
			numer_sekcji++;
				przeladuj wspólrzędne sekcji;
				pobierz X początkowego Xstart do Xaktualna;
				oblicz YdlaXaktualne dla Xaktualna;
				return YdlaXaktualne;
	}
}

function incrementX_etap1() {
	Xaktualna--;
	if (Xaktualna==Xmin)
	{
		etap++;
		numer_sekcji++; //powinna byc sekcja 5
		przeladuj wspólrzędne sekcji;
		pobierz X początkowego Xstart do Xaktualna;
		oblicz YdlaXaktualne dla Xaktualna;	
		return YdlaXaktualne;
		if (Xaktualna==min_X_dla sekcji)
	{
			numer_sekcji++;
				przeladuj wspólrzędne sekcji;
				pobierz X początkowego Xstart do Xaktualna;
				oblicz YdlaXaktualne dla Xaktualna;
				return YdlaXaktualne;
	}
	}
	
	function incrementX_etap2()
{
	Xaktualna++;
	if (Xaktualna==Xmax)
	{
		etap++;
		numer_sekcji++; //powinna byc sekcja 5
		przeladuj wspólrzędne sekcji;
		pobierz X początkowego Xstart do Xaktualna;
		oblicz YdlaXaktualne dla Xaktualna;	
		return YdlaXaktualne;
	}
	
}